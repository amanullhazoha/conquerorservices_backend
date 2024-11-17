const Yup = require("yup");
const {
  parse,
  isEqual,
  isAfter,
  isValid,
  isFuture,
  parseISO,
} = require("date-fns");

const inPersonInterviewSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  message: Yup.string().required("Note is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  time: Yup.string()
    .required("Time is required")
    .test("isFutureOrCurrentTime", "Time must not be in the past", (value) => {
      if (!value) return false;

      const parsedTime = parse(value, "h:mm", new Date());
      const now = new Date();

      return isAfter(parsedTime, now) || isEqual(parsedTime, now);
    }),
  police_station: Yup.string().required("Police station is required"),
  post_office: Yup.string().required("Post office is required"),
  scheduled_at: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
    .test("isValidDate", "Input must be a valid date", (value) => {
      if (!value) return false;
      return isValid(parseISO(value));
    })
    .test(
      "isFutureOrCurrent",
      "Scheduled time must not be in the past",
      (value) => {
        if (!value) return false;

        const inputDate = parseISO(value);

        return isFuture(inputDate) || isAfter(inputDate, new Date());
      }
    )
    .required("Scheduled date is required"),
  required_document: Yup.string().required("Required document is required"),
  zonecountry: Yup.string().required("Time zone is required"),
});

const onlineInterviewSchema = Yup.object().shape({
  message: Yup.string().required("Note is required"),
  time: Yup.string()
    .required("Time is required")
    .test("isFutureOrCurrentTime", "Time must not be in the past", (value) => {
      if (!value) return false;

      const parsedTime = parse(value, "h:mm", new Date());
      const now = new Date();

      return isAfter(parsedTime, now) || isEqual(parsedTime, now);
    }),
  scheduled_at: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
    .test("isValidDate", "Input must be a valid date", (value) => {
      if (!value) return false;
      return isValid(parseISO(value));
    })
    .test(
      "isFutureOrCurrent",
      "Scheduled time must not be in the past",
      (value) => {
        if (!value) return false;

        const inputDate = parseISO(value);

        return isFuture(inputDate) || isAfter(inputDate, new Date());
      }
    )
    .required("Scheduled date is required"),
  zonecountry: Yup.string().required("Time zone is required"),
});

module.exports = {
  onlineInterviewSchema,
  inPersonInterviewSchema,
};
