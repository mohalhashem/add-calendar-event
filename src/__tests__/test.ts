import { createEventURL, CalendarType } from '../index';


test('Get Google Event URL', () => {
    const url = createEventURL(
                    CalendarType.GOOGLE,
                    {
                        startDate: new Date(),
                        endDate: new Date(),
                        location: 'Moon',
                        title: 'A new event',
                        details: 'This is a test event',
                        eventUrl: 'https://github.com'
                    }
                );
    console.log(url);
});

test('Get outlook.com Event URL', () => {
    const url = createEventURL(
                    CalendarType.OUTLOOKCOM,
                    {
                        startDate: new Date(),
                        endDate: new Date(),
                        location: 'Moon',
                        title: 'A new event',
                        details: 'This is a test event',
                        eventUrl: 'https://github.com'
                    }
                );
    console.log(url);
});

test('Get yahoo Event URL', () => {
    const url = createEventURL(
                    CalendarType.YAHOO,
                    {
                        startDate: new Date(),
                        endDate: new Date(),
                        location: 'Moon',
                        title: 'A new event',
                        details: 'This is a test event',
                        eventUrl: 'https://github.com'
                    }
                );
    console.log(url);
});

test('Get ics file', () => {
    const url = createEventURL(
                    CalendarType.ICS,
                    {
                        startDate: new Date(),
                        endDate: new Date(),
                        location: 'Moon',
                        title: 'A new event',
                        details: 'This is a test event',
                        eventUrl: 'https://github.com'
                    }
                );
    console.log(url);
});