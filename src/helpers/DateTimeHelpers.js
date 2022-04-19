import moment from "moment";
import "moment/dist/locale/vi";
moment.locale("vi");

export const DateTimeHelpers = {
    TotalMinutesFromTo: (from, to) => {
        var __startTime = moment(from).format();
        var __endTime = moment(to).format();

        var __duration = moment.duration(moment(__endTime).diff(__startTime));
        var __hours = __duration.asHours();
        return __hours * 60;
    }
}