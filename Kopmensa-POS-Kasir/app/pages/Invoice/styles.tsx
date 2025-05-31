import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 18,
    },
    headerContainer: {
        width: '100%',
        height: 435,
        position: 'relative',
    },
    headerBg: {
        paddingTop: 50,
        width: '100%',
        height: '100%',
        backgroundColor: '#b1cfe3',
    },
    syncIcon: {
        alignItems: 'flex-end',
        paddingRight: 16,
    },
    headerTitle: {
        marginTop: 15,
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    headerSubTitle: {
        marginLeft: 20,
        fontSize: 14,
        color: 'white',
    },
    ivtContainer: {
        marginTop: 150,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        position: 'absolute',
        backgroundColor: 'white',
    },
    ivtSummaryContainer: {
        marginTop: 8,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    ivtProgressBar: {
        marginTop: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    ivtProgressSection: {
        height: '100%',
    },
    ivtCategoryContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 20,
    },
    ivtCategoryLabel: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ivtExpiredContainer: {
        marginTop: 20,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 15,
        backgroundColor: '#e4eef5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ivtExpiredLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    bodyContainer: {
        width: '100%',
        paddingBottom: 50,
    },
    wasteInOutContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    wasteInOutButton: {
        paddingVertical: 25,
        elevation: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    wasteInOutButtonText: {
        marginTop: 5,
    },
    activityContainer: {
        padding: 16,
    },
    activityInOut: {
        marginTop: 5,
        flexDirection: 'row',
        width: '50%',
        alignItems: 'center',
    }

});

export default styles;