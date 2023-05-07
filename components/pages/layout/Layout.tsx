import { Box } from "@chakra-ui/react"

export default function Layout({ children }){
    return(
        <Box w={'100%'} h={'100%'} backgroundColor={'red'}>
            {children}
        </Box>
    )
}