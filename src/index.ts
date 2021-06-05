import * as moment from 'moment';
import * as qs from "qs";

export enum CalendarType {
    ICS, // Apple and Outlook
    GOOGLE,
    OUTLOOKCOM,
    YAHOO
}

function randomId() {
    let n = Math.floor(Math.random() * 999999999999).toString();
    return new Date().getTime().toString() + "" + n;
}

function dateFormatter(date: Date) {
    let formattedDate = moment.utc(date).format("YYYYMMDDTHHmmssZ");
    return formattedDate.replace("+00:00", "Z");
}

function calculateDuration(startTime: Date, endTime: Date) {
    const end = moment.utc(endTime).format("DD/MM/YYYY HH:mm:ss");
    const start = moment.utc(startTime).format("DD/MM/YYYY HH:mm:ss");

    const difference = moment(end, "DD/MM/YYYY HH:mm:ss").diff(
        moment(start, "DD/MM/YYYY HH:mm:ss")
    );

    return Math.floor(moment.duration(difference).asHours()) + moment.utc(difference).format(":mm");
}

export function createEventURL(
    type: CalendarType, 
	{
        startDate,
        endDate,
        location,
        title,
        details,
        eventUrl
    }: {
        startDate: Date;
        endDate: Date;
        location: string;
        title: string;
        details: string;
        eventUrl: string;
    }
) {
	const start: string = dateFormatter(startDate);
	const end: string = dateFormatter(endDate);
    switch(type) {
        case CalendarType.GOOGLE: {
            return `https://calendar.google.com/calendar/render?${qs.stringify(
                {
                    action: 'TEMPLATE',
                    dates: start + '/' + end,
                    location,
                    text: title,
                    details,
                }
            )}`
        }
        case CalendarType.OUTLOOKCOM: {
            return `https://outlook.live.com/owa/?${qs.stringify(
                {
                    rru: 'addevent',
                    startdt: start,
                    enddt: end,
                    subject: title,
                    location,
                    body: details,
                    allday: false,
                    uid: randomId(),
                    path: '/calendar/view/Month',
                }
            )}`
        }
        case CalendarType.YAHOO: {
            return `https://calendar.yahoo.com/?${qs.stringify(
                {
                    v: 60,
                    view: 'd',
                    type: 20,
                    title,
                    st: start,
                    dur: calculateDuration(startDate, endDate),
                    desc: details,
                    in_loc: location,
                }
            )}`
        }
        case CalendarType.ICS: {
            return [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "BEGIN:VEVENT",
                "URL:" + eventUrl,
                "DTSTART:" + start,
                "DTEND:" + end,
                "SUMMARY:" + title,
                "DESCRIPTION:" + details,
                "LOCATION:" + location,
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\n");
        }
        default:
            break;
    }
}
