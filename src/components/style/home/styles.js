import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },

  innerContainer: {
    backgroundColor: '#f2f2f2'
  },

  containerLogo: {
    flex: 2,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoImage: {
    width: '100%'
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start'
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#fff'
  },

  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginTop: 10
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10
  },

  trashButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5
  },

  button: {
    backgroundColor: '#ff6600',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    padding: 8,
    alignItems: 'center',
    marginVertical: 10
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})
