import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    fontFamily: 'Bitter'
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Bitter-Bold'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  acornDecoration: {
    marginHorizontal: 10
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.8,
    fontFamily: 'Bitter',
    color: '#FFD600'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  editButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  formContainer: {},
  partnersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  partnerSection: {
    marginBottom: 20,
    padding: 15,
    width: '48%',
    minWidth: 280
  },
  partnerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Bitter-Bold'
  },
  input: {
    height: 50,
    marginBottom: 5,
    paddingHorizontal: 10,
    fontFamily: 'Bitter'
  },
  inputError: {},
  errorText: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'Bitter'
  },
  button: {
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Bitter-Bold'
  },
  partnersInfo: {
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  partnerInfoItem: {
    width: '48%',
    minWidth: 280,
    padding: 10
  },
  partnersInfoText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Bitter'
  },
  billInput: {
    height: 70,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 15,
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    fontFamily: 'Bitter'
  },
  equifyButton: {
    alignSelf: 'center',
    width: '100%',
    borderRadius: 8
  },
  equifyButtonText: {
    fontSize: 18,
    fontFamily: 'Bitter-Bold',
    paddingVertical: 20
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center'
  },
  resetButtonText: {
    fontSize: 14,
    fontFamily: 'Bitter'
  },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: 'Bitter'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(98, 0, 238, 0.5)'
  },
  modalView: {
    margin: 20,
    padding: 25,
    alignItems: 'center',
    width: '80%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'Bitter-Bold'
  },
  resultText: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: 'Bitter'
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  resultName: {
    fontSize: 18,
    fontFamily: 'Bitter'
  },
  resultAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Bitter-Bold'
  },
  closeButton: {
    padding: 12,
    alignItems: 'center',
    marginTop: 20,
    width: 120
  }
})
