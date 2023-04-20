import { makeStyles } from "@mui/styles"
const style = makeStyles({
    sideDiv: {
        width: '100%',
        height: "100%",
        background: "rgb(13,0,36)",
background: "linear-gradient(90deg, rgba(13,0,36,1) 0%, rgba(218,1,255,1) 88%)",

        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    textHeadStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFF',
        width: 300,
        textAlign: 'center',
        marginBottom: 26
    },
    textSubStyle: {
        fontSize: 18,
        color: '#FFF',
        width: 300,
        textAlign: 'center',
        marginBottom: 30
    },
    dialogWelcomeStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20

    },
    dialogText: {
        fontSize: 12

    },
    dialogStyle: {
        borderRadius: 50

    },
    otpErrorMessage: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: 'red'

    }, root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subdiv: {

        padding: 20,



    },
    heading: {
        fontWeight: 'bold',
        padding: 5,
        fontSize: 30
    },
    vendorText: {
        fontSize: '12px',
        color: '#717171',
        marginTop: '10px'
    },
    VendorTextStyle: {
        color: 'blue',
        textDecorationLine: 'underline'
    },
    inputMargin: {
        marginTop: '10px',
        marginBottom: '10px'
    }





})
export default style