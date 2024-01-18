// Import necessary components and libraries
import CustomInput from "@/components/CustomInput";
import { useQuery } from "@apollo/client";
import { GET_STAR_WARS_MOVIES } from "@/quries/movies";
import { Form, Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Card,
  Input,
  Spin,
  Typography,
} from "antd";
import { useNotification } from "@/components/notification";
import CustomSelect from "@/components/CustomSelect";

// Define validation schema for form fields
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("You need to enter a first name."),
  lastName: Yup.string().required("You need to enter a last name."),
});

// Initial values for form fields
const initialValues = {
  firstName: "",
  lastName: "",
  movie: "",
};

// Main component for the Home page
export default function Home() {
  // State variables and hooks
  const [submitted, setSubmitted] = useState(false);
  const notificationContext = useNotification();
  const handleNotifications: any = notificationContext?.handleNotifications;
  const { Text } = Typography;

  // Function to handle form submission
  const handleSubmit = async (values: any) => {
    setSubmitted(true);
    // Perform additional actions on form submission if needed
  };

  // Query to get Star Wars movies
  const { loading, error, data } = useQuery(GET_STAR_WARS_MOVIES);

  // Handle errors from the API
  useEffect(() => {
    if (error) {
      const errorMessage = error.message || "An error occurred.";
      handleNotifications("error", "Error", errorMessage, 555);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card
          className={`w-full md:!w-[800px] md:!h-[600px] h-screen relative px-[32px] py-[16px] rounded-none md:rounded-lg  shadow-lg`}
        >
          {loading && <Spin size="large" className="loader" />}
          <div className="text-[24px] font-[900] text-[#1E5167] leading-none pb-8">
            My form
          </div>
          {submitted ? (
            <div className="absolute-center md:text-[16px]">
              Thanks for submitting the form!
            </div>
          ) : (
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, errors, touched }) => {
                return (
                  <Form className="">
                    <>
                      {/* Display error messages for first name and last name if touched and there are errors */}
                      {Object.keys(errors).length > 0 &&
                        touched.firstName &&
                        touched.lastName && (
                          <div className="flex flex-col error pb-4">
                            <div>
                              <Text type="danger" className="flex text-left">
                                {" "}
                                <ErrorMessage name="firstName" />
                              </Text>
                            </div>
                            <div>
                              <Text type="danger" className="flex text-left">
                                {" "}
                                <ErrorMessage name="lastName" />
                              </Text>
                            </div>
                          </div>
                        )}
                      {/* Input fields for first name and last name */}
                      <div className="flex flex-col md:flex-row">
                        <div className="basis-0 md:basis-1/2 md:pr-2 pb-4">
                          {/* Common dynamic input component for First Name */}
                          <CustomInput
                            defaultValue={values.firstName}
                            label="First Name"
                            type="text"
                            name="firstName"
                            as={Input}
                            required
                          />
                        </div>
                        <div className="basis-0 md:basis-1/2 md:pl-2 pb-4">
                          {/* Common dynamic input component for Last Name */}
                          <CustomInput
                            defaultValue={values.lastName}
                            label="Last Name"
                            type="text"
                            name="lastName"
                            as={Input}
                            required
                          />
                        </div>
                      </div>
                      {/* Select input for favorite Star Wars movie */}
                      <div className="flex flex-col md:flex-row">
                        <div className="basis-0 md:basis-1/2 md:pr-2">
                          {/* Common dynamic select component for Star Wars movie */}
                          <CustomSelect
                            defaultValue={values.movie}
                            label="Favorite Star Wars movie"
                            name="movie"
                            id="movie"
                            placeholder="Favorite Star Wars movie"
                            options={data?.allFilms.films.map(
                              (option: any) => ({
                                value: option.title,
                                label: option.title,
                              })
                            )}
                            onSelect={(value) => {
                              setFieldValue("movie", value);
                            }}
                          />
                        </div>
                      </div>
                      {/* Submit button */}
                      <div className="absolute right-[32px] bottom-[16px] ">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="bg-[#00B3FF] hover:!bg-[#00B3FF] font-[700]"
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  </Form>
                );
              }}
            </Formik>
          )}
        </Card>
      </div>
    </>
  );
}
