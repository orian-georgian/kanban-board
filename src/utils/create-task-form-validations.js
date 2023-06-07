export default function validate(values) {
  let errors = {};

  if (!values?.title) {
    errors.title = "Title is required";
  } else if (values?.title.length > 50) {
    errors.title = "Title should have maximum 50 characters";
  }

  if (!values?.description) {
    errors.description = "Description is required";
  } else if (values?.title.length > 200) {
    errors.description = "Description should have maximum 200 characters";
  }

  if (!!values.subtasks && values.subtasks.length > 0) {
    values.subtasks.forEach((subtask) => {
      if (!subtask.name) {
        errors[`subtasks${subtask.id}`] = "Subtask is required";
      }
    });
  }

  return errors;
}
