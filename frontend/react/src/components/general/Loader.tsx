import "../../assets/css/loader.css";

const Loader = () => {
  return (
    <section>
      <div id="pre-loader">
        <div id="loader-logo"></div>
        <div id="loader-circle"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div>
    </section>
  );
};

export default Loader;
