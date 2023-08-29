import { Route, Routes } from 'react-router-dom';

import NavBar from './components/navbar';
import RecordList from './components/record-list';
import Edit from './components/edit';
import Create from './components/create';

const App = () => (
  <div>
    <NavBar />
    <Routes>
      <Route exact path="/" element={<RecordList />} />
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  </div>
);

export default App;