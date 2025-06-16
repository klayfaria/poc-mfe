const Title = ({ subtitle }: { subtitle: string }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        This is the Remote application
      </h1>
      <h2 className="text-xl text-center mb-8">{subtitle}</h2>
    </>
  );
};

export default Title;
