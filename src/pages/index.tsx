import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { useNotification } from "@/components/notification";
import { GET_STAR_WARS_MOVIES } from "@/quries/movies";
import { useQuery } from "@apollo/client";
import { Button, Card, Input, Spin, Typography } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("You need to enter a first name."),
  lastName: Yup.string().required("You need to enter a last name."),
});
const initialValues = {
  firstName: "",
  lastName: "",
  movie: "",
};
export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const notificationContext = useNotification();
  const handleNotifications: any = notificationContext?.handleNotifications;
  const { Text } = Typography;
  const handleSubmit = async (values: any) => {
    setSubmitted(true);
  };

  const { loading, error, data } = useQuery(GET_STAR_WARS_MOVIES);

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
          className={`w-full md:!w-[800px] md:!h-[600px] h-screen relative px-[32px] py-[16px] rounded-none md:rounded-lg `}
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
                      {Object.keys(errors).length > 0 &&
                        touched.firstName &&
                        touched.lastName &&(
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
                      <div className="flex flex-col md:flex-row">
                        <div className="basis-0 md:basis-1/2 md:pr-2 pb-4">
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
                      <div className="flex flex-col md:flex-row">
                        <div className="basis-0 md:basis-1/2 md:pr-2">
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
                            // error={<ErrorMessage name="dietary_preference" />}
                          />
                        </div>
                      </div>
                      <div className="absolute right-[32px] bottom-[16px] ">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="bg-[#00B3FF] hover:!bg-[#00B3FF]"
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
