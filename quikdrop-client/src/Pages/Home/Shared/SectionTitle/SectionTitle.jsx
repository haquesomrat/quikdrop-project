const SectionTitle = ({ children }) => {
  return (
    <div>
      <h2 className="font-ruda text-2xl sm:text-3xl md:text-4xl w-10/12 sm:w-2/3 md:w-2/5 lg:w-2/5  mx-auto tracking-wide font-extrabold">
        {children}
      </h2>
    </div>
  );
};

export default SectionTitle;
