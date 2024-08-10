import React from "react";
import "./Services.css";
const Services = () => {
  return (
    <div className="services-container">
      <div className="services-list-container">
        {/* desc */}
        <div className="services-desc-container">
          <h1>
            My Awesome <span>Services</span>
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo velit
            ratione quidem minima necessitatibus. Inventore sunt cupiditate
            pariatur ipsum a laudantium, dolor minus, illo laboriosam
            consequatur provident cum velit tempore! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Fuga placeat rem illo molestias
            mollitia voluptatem dicta voluptate eius, laboriosam quaerat officia
            sunt harum accusantium rerum voluptas cumque incidunt commodi eaque?
          </p>
          <button>Hire Me</button>
        </div>
        {/* item */}
        <div className="service-item-container">
          <div className="services-item">
            <i className="fa-solid fa-code"></i>
            <div className="item-desc">
              <h3>Web Development</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                laboriosam, rerum cupiditate sint praesentium nam architecto
                ullam in, minima reiciendis provident amet doloremque facilis
                obcaecati neque nemo totam. Tempore, illo.
              </p>
            </div>
          </div>
          <div className="services-item">
            <i className="fa-solid fa-desktop"></i>
            <div className="item-desc">
              <h3>Desktop Development</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                laboriosam, rerum cupiditate sint praesentium nam architecto
                ullam in, minima reiciendis provident amet doloremque facilis
                obcaecati neque nemo totam. Tempore, illo.
              </p>
            </div>
          </div>
          <div className="services-item">
            <i className="fa-solid fa-tablet-alt"></i>
            <div className="item-desc">
              <h3>U/X Design</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                laboriosam, rerum cupiditate sint praesentium nam architecto
                ullam in, minima reiciendis provident amet doloremque facilis
                obcaecati neque nemo totam. Tempore, illo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
