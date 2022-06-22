import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { UploadFile } from '../pages/UploadFile';
import { Navbar } from '../ui/Navbar';

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="upload-file" element={<UploadFile />} />
        </Routes>
      </div>
    </>
  );
};
