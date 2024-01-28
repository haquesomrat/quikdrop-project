const PageTitle = ({ children }) => {
  return (
    <div className="py-6">
      <h2 className="font-ruda text-3xl font-bold text-gray-400 ">
        {children}
      </h2>
    </div>
  );
};

export default PageTitle;
