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
    color: '#2f95dc'
  },
  container: {
    flex: 1
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
    marginBottom: 5
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    opacity: 0.7
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  editButton: {
    backgroundColor: '#2f95dc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  formContainer: {
    width: '100%',
    maxWidth: 800
  },
  partnersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  partnerSection: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    width: '48%',
    minWidth: 280
  },
  partnerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  inputError: {
    borderColor: '#ff6347'
  },
  errorText: {
    color: '#ff6347',
    fontSize: 12,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#2f95dc',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  partnersInfo: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  partnerInfoItem: {
    width: '48%',
    minWidth: 280,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(200, 200, 200, 0.05)'
  },
  partnersInfoText: {
    fontSize: 16,
    marginBottom: 5
  },
  billInput: {
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 10,
    paddingHorizontal: 15,
    fontSize: 22,
    backgroundColor: 'white',
    textAlign: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  equifyButton: {
    backgroundColor: '#2f95dc',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center'
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center'
  },
  resetButtonText: {
    color: '#ff6347',
    fontSize: 14
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
    color: '#888',
    fontSize: 16
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 400
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  resultText: {
    fontSize: 18,
    marginBottom: 15
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  resultName: {
    fontSize: 18
  },
  resultAmount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#2f95dc',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: 120
  }
})
