import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChangeLogo = () => {
  const [logo, setLogo] = useState(null);
  const [favicon, setFavicon] = useState(null);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleFaviconChange = (e) => {
    setFavicon(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (logo) {
        const logoFormData = new FormData();
        logoFormData.append('logo', logo);

        const logoResponse = await axios.put('http://localhost:5000/general/logo', logoFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(logoResponse.data.message);
      }

      if (favicon) {
        const faviconFormData = new FormData();
        faviconFormData.append('favicon', favicon);

        const faviconResponse = await axios.put('http://localhost:5000/general/favicon', faviconFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(faviconResponse.data.message);
      }

      alert('Files uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Error uploading files');
    }
  };

  return (
    <div>
      <div className="container-fluid" >
        <div className="card p-4">
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <label htmlFor="logo" className="form-label">Logo</label>
                <input 
                  type="file" 
                  name="logo" 
                  className="form-control" 
                  id="logo" 
                  accept="image/*" 
                  onChange={handleLogoChange} 
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <label htmlFor="favicon" className="form-label">Favicon</label>
                <input 
                  type="file" 
                  name="favicon" 
                  className="form-control" 
                  id="favicon" 
                  accept="image/*" 
                  onChange={handleFaviconChange} 
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-warning float-end mt-3">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeLogo;
