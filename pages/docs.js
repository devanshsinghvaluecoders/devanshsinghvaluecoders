// import { withSwagger } from "next-swagger-doc";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJSDoc from "swagger-jsdoc";
import { join } from "path";

function createSwaggerSpec({
  openApiVersion = "3.0.0",
  apiFolder = "pages/api",
  title,
  version,
}) {
  const apiDirectory = join(process.cwd(), apiFolder);

  const options = {
    definition: {
      openapi: openApiVersion,
      info: {
        title,
        version,
      },
    },
    apis: [`${apiDirectory}/*.js`, "pages/api/cart/*.js"], // files containing annotations as above
  };

  return swaggerJSDoc(options);
}

// export default ApiDoc();
function Doc(props) {
  console.log(props);
  return (
    <div>
      <h1>hello</h1>
      <SwaggerUI spec={props.spec} />
    </div>
  );
}
export const getServerSideProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: "NextJS Swagger",
    version: "3.0.0",
  });
  return {
    props: {
      spec,
    },
  };
};

export default Doc;
