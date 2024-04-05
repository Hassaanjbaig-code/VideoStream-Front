interface VideoAbout {
  View: number | undefined;
  description: string | undefined;
  createdAt: string | Date | undefined
}

const VideoAbout = ({ View, description, createdAt }: VideoAbout) => {
  function convertDateToMonthOrDaysAgo(GivenDate: string | Date | undefined) {
    const today: Date = new Date();
    const givenDate: Date = GivenDate ? new Date(GivenDate) : today;

    // Calculate the difference in milliseconds
    const timeDifference = today.getTime() - givenDate.getTime();

    // Calculate the number of days
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    if (daysDifference < 30) {
      // If it's less than a month, return the number of days
      return (
        Math.round(daysDifference) +
        " day" +
        (Math.round(daysDifference) === 1 ? "" : "s") +
        " ago"
      );
    } else {
      // If it's a month or more, return the number of months
      const monthsDifference = timeDifference / (1000 * 60 * 60 * 24 * 30.44);
      const monthsDifferenceRounded = Math.round(monthsDifference);
      return (
        monthsDifferenceRounded +
        " month" +
        (monthsDifferenceRounded === 1 ? "" : "s") +
        " ago"
      );
    }
  }
  return (
    <div className="flex flex-col">
      <div className="text-gray-500 flex gap-3">
        <h5>{convertDateToMonthOrDaysAgo(createdAt)}</h5>
        <h5>{View} View</h5>
      </div>
      <h2 className="my-3 max-md:my-1 text-lg ">{description}</h2>
    </div>
  );
};

export default VideoAbout;
