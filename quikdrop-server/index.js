const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// port
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// token verification middlewares
const verifyToken = (req, res, next) => {
  // console.log("inside verify token", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.yiog314.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("quikdropDb").collection("users");
    const parcelCollection = client.db("quikdropDb").collection("parcels");
    const reviewCollection = client.db("quikdropDb").collection("reviews");

    // Role verification middlewares
    // For admin
    const verifyAdmin = async (req, res, next) => {
      const query = {
        $or: [
          { email: req?.decoded?.email },
          { _id: new ObjectId(req?.params?.id) },
        ],
      };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      // console.log(isAdmin);
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // verify deliveryman after verify token
    const verifyDeliveryman = async (req, res, next) => {
      const query = {
        $or: [
          { email: req?.decoded?.email },
          { _id: new ObjectId(req?.params?.id) },
        ],
      };
      const user = await userCollection.findOne(query);
      // console.log(user);
      const isDeliveryman = user?.role === "deliveryman";
      // console.log(isDeliveryman);
      if (!isDeliveryman) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // convert role to admin
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    // check user is admin?
    app.get(
      "/users/admin/:email",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        res.send({ admin: true });
      }
    );

    // convert role to deliveryman
    app.patch(
      "/users/deliveryman/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "deliveryman",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );

    // check user isDeliveryman
    app.get(
      "/users/deliveryman/:email",
      verifyToken,
      verifyDeliveryman,
      async (req, res) => {
        res.send({ deliveryman: true });
      }
    );

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    app.get("/user", async (req, res) => {
      const email = req.query.email;
      let query = {};
      if (email) {
        query = { email: email };
      }
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // admin related api
    app.get("/users", verifyToken, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // find logged in user
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exists", insertedId: null });
      } else {
        const result = await userCollection.insertOne(user);
        res.send(result);
      }
    });

    // book a parcel api
    app.post("/parcels", async (req, res) => {
      const bookingInfo = req.body;
      const result = await parcelCollection.insertOne(bookingInfo);
      res.send(result);
    });

    // get all parcels
    app.get("/parcels", verifyToken, async (req, res) => {
      const result = await parcelCollection.find().toArray();
      res.send(result);
    });

    // assign a parcel to deliveryman
    app.patch("/parcels/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const assignedData = req.body;
      const updatedDoc = {
        $set: {
          booking_status: "on the way",
          deliveryman_id: assignedData.deliveryman_id,
          approximate_date: assignedData.approximate_date,
        },
      };
      const result = await parcelCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // cancel a parcel by deliveryman
    app.patch(
      "/cancel/:id",
      verifyToken,
      verifyDeliveryman,
      async (req, res) => {
        const id = req.params?.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            booking_status: "cancelled",
          },
        };
        const result = await parcelCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      }
    );

    // deliver a parcel by deliveryman
    app.patch(
      "/deliver/:id",
      verifyToken,
      verifyDeliveryman,
      async (req, res) => {
        const id = req.params?.id;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            booking_status: "delivered",
          },
        };
        const result = await parcelCollection.updateOne(
          filter,
          updatedDoc,
          options
        );
        res.send(result);
      }
    );

    // get a parcel details
    app.get("/parcel/:id", async (req, res) => {
      const id = req.params?.id;
      const query = { _id: new ObjectId(id) };
      const result = await parcelCollection.findOne(query);
      res.send(result);
    });

    // get parcels by email
    app.get("/parcels/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await parcelCollection.find(query).toArray();
      res.send(result);
    });

    // update a parcel
    app.patch("/parcel/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = req.body;
      const updatedParcel = {
        $set: {
          name: updatedData?.name,
          phone: updatedData?.phone,
          email: updatedData?.email,
          type: updatedData?.type,
          weight: updatedData?.weight,
          receiver_name: updatedData?.receiver_name,
          receiver_phone: updatedData?.receiver_phone,
          delivery_address: updatedData?.delivery_address,
          booking_date: updatedData?.booking_date,
          requested_date: updatedData?.requested_date,
          latitude: updatedData?.latitude,
          longtitude: updatedData?.longtitude,
          price: updatedData?.price,
        },
      };
      const result = await parcelCollection.updateOne(
        filter,
        updatedParcel,
        options
      );
      res.send(result);
    });

    // get delivered parcels by deliveryman ID
    app.get("/delivered/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { deliveryman_id: id, booking_status: "delivered" };
      const result = await parcelCollection.find(query).toArray();
      res.send(result);
    });

    // review related api
    app.post("/reviews", verifyToken, async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    app.get("/reviews", verifyToken, verifyDeliveryman, async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // get reviews by deliveryman ID
    app.get("/reviews/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { deliveryman_id: id };
      const result = await reviewCollection.find(query).toArray();
      res.send(result);
    });

    // user update profile
    app.patch("/users/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedImg = req.body;
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          image: updatedImg.img,
        },
      };
      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    // home stats
    app.get("/stats", async (req, res) => {
      const users = await userCollection.estimatedDocumentCount();
      const parcels = await parcelCollection.estimatedDocumentCount();
      const deliveredParcels = await parcelCollection
        .find({
          booking_status: "delivered",
        })
        .toArray();
      const delivered = deliveredParcels.length;

      res.send({
        users,
        parcels,
        delivered,
      });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("QuikDrop server is running successfully");
});

app.listen(port, () => {
  console.log(`QuikDrop server is running port ${port}`);
});
