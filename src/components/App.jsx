import ImageFinder from '../components/ImageFinder/ImageFinder';

export const App = () => {
  return (
    <div>
      <ImageFinder onSubmit={values => console.log('values, ', values)} />
    </div>
  );
};

//   style={{
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 40,
//     color: '#010101'
//   }}
// >
//   React homework template
