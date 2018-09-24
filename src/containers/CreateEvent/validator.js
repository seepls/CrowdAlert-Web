export default ({ details, tabs }) => {
  if (!tabs.isValid.location) {
    return {
      validationErrors: true,
      message: {
        header: 'Location',
        body: 'Save the location',
      },
    };
  }
  if (!details.eventType) {
    return {
      validationErrors: true,
      message: {
        header: 'Event not given',
        body: 'Select an event type from the dropdown',
      },
    };
  }
  if (!details.title) {
    return {
      validationErrors: true,
      message: {
        header: 'Short description not given',
        body: 'Write a short description about the event',
      },
    };
  }

  return {
    validationErrors: false,
  };
};
