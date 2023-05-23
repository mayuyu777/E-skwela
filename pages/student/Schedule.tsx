import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { hasAccess } from "@/lib/routes";
import Layout from "@/components/pages/Layout";
import SessionInterface from "@/interfaces/SessionInterface";
import { Box, Flex, Heading } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import moment from "moment";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    let sessionUser = session?.user as SessionInterface;
    if (status === "unauthenticated") {
      router.push("/SignIn");
    }
    const res = hasAccess(router.pathname, sessionUser?.role);

    if (!res.authorized) {
      router.push(res.path);
    }
  }, [session]);

  return (
    <Layout>
      <Flex
        mt="4vh"
        w="80vw"
        h="80vh"
        bg="white"
        boxShadow="lg"
        alignItems="center"
        flexDirection="column"
      >
        <Heading py="4vh">Schedule</Heading>
        <Box w="50rem" overflow="scroll">
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
            height="30rem"
            weekends={false}
            events={[
              {
                title: "test",
                id: "1",
                backgroundColor: "orange",
                start: moment().startOf("week").add(1, "days").hour(6).minutes(30).toISOString(),
                end: moment().startOf("week").add(1, "days").hour(9).minutes(30).toISOString(),
                allDay: false,
              },
            ]}
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
    </Layout>
  );
}
