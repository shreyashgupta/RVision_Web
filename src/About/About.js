import React from "react";
import image from "../assets/image.png";
const About = () => {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            What makes our application different
          </h1>
          <img
            class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={image}
          />
          <div class="text-center lg:w-2/3 w-full">
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              A web application to make online evaluation and managing students
              in real time easier
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              In recent times, the pandemic situation has brought major changes
              in the way educational institutions function. The need has come to
              conduct assessments online - and this need is here to stay. Many
              institutions that have tried to adapt existing online
              communication systems for conducting examinations, such attempts
              have eventually been a failure. The workarounds burden both the
              students taking these examinations and the faculty members that
              design the tests. Therefore we propose a system to automate the
              entire process using which assessment can be conducted online in
              an improved manner.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our online assessment system (OAS){" "}
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              The OAS proposed is a web application capable of running on any
              desktop or laptop browser to facilitate online assessment. The
              system is intended to be deployed and maintained by educational
              institutions to conduct assessments. The faculty and the students
              are expected to access the system via a computer browser.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our Plagiarism detection system{" "}
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              The Plagiarism detection feature of this web application that can
              be deployed on any computer to detect plagiarism in the text of
              the answers.
            </p>
            <h2 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-600">
              Our online Video Conferencing System (OVCS){" "}
            </h2>
            <p class="text-left lg:mb-8 leading-relaxed">
              The OVCS proposed is a web application capable of running on any
              desktop or laptop browser to facilitate video/audio interaction
              between the students and teachers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
