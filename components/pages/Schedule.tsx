import Layout from "@/components/pages/Layout";
import { Box, Flex, Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";
import SubWithSched from "@/interfaces/SubWithSched";
import EventFullCalendar from "@/interfaces/EventFullCalendar";

export default function Schedule(props: {subjects: SubWithSched[]}) {
  const totalSchoolDays = 5;

  function fullcalendarEvents(totalSchoolDays: number, subjects: SubWithSched[]): EventFullCalendar[] {
    let eventArray: EventFullCalendar[] = [];

    subjects.map((data) => {

      let subDays = data.class_schedules.days;
      const start = new Date(data.class_schedules.start);
      const end = new Date(data.class_schedules.end);
      const colorBg = "rgb("+ Math.random()* 255 +", "+ Math.random()* 255 +", "+ Math.random()* 255 +")";

      while(subDays > 0){
        for (let i = (totalSchoolDays-1); i >= 0; i--) {
          let expo = Math.pow(2,i);
          if(subDays >= expo){
            eventArray.push({
              title: data.subjects.name,
              id: Math.random().toString(),
              backgroundColor: colorBg,
              start: moment().startOf("week").add(i+1, "days").hour(start.getUTCHours()).minutes(start.getUTCMinutes()).toISOString(),
              end: moment().startOf("week").add(i+1, "days").hour(end.getUTCHours()).minutes(end.getUTCMinutes()).toISOString(),
              allDay: false,
            });
            subDays -= expo;
          }
        }
      }
    })
    return eventArray;
  }

  return (
      <Flex
        mt="4vh"
        w="80vw"
        h={"auto"}
        p={"10px"}
        pb={"5pc"}
        mb={"3pc"}
        bg="white"
        boxShadow="lg"
        alignItems="center"
        flexDirection="column"
      >
        <Heading py="4vh">Schedule</Heading>
        <Box w={"auto"}>
          <FullCalendar
            expandRows={true}
            initialView="timeGridWeek"
            plugins={[timeGridPlugin]}
            buttonText={{ today: "Today" }}
            headerToolbar={{
              start: "",
              center: "",
              end: "",
            }}
            allDaySlot={false}
            height={"auto"}
            weekends={false}
            events={ props.subjects.length > 0? fullcalendarEvents(totalSchoolDays,props.subjects) : {} }
            slotMinTime={{
              hour: 6,
            }}
            slotMaxTime={{
              hour: 18,
            }}
            dayHeaderFormat={{
              weekday: "long",
            }}
          />
        </Box>
      </Flex>
  );
}
