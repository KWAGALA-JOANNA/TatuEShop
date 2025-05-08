// ContactPage.jsx
import { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <Container maxWidth="lg">
        <Box className="text-center mb-12">
          <Typography variant="h2" className="font-bold text-gray-800 mb-2">
            Contact Us
          </Typography>
          <Typography variant="subtitle1" className="text-gray-600 max-w-lg mx-auto">
            Have questions or need assistance? Reach out to our team and we&apos;ll be happy to help.
          </Typography>
        </Box>

        <Grid container spacing={6} className="items-start">
          {/* Contact Information Card */}
          <Grid item xs={12} md={5}>
            <Paper elevation={3} className="p-8 bg-white rounded-xl h-full">
              <Typography variant="h5" className="font-bold text-gray-800 mb-6">
                Contact Information
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-8">
                Fill up the form and our team will get back to you within 24 hours.
              </Typography>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <PhoneIcon className="text-purple-600" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-500">
                      Phone
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      +1 (555) 123-4567
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <EmailIcon className="text-blue-600" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-500">
                      Email
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      support@example.com
                    </Typography>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <LocationOnIcon className="text-green-600" />
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-500">
                      Location
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      123 Business Ave, Suite 100
                    </Typography>
                    <Typography variant="body1" className="font-medium">
                      San Francisco, CA 94107
                    </Typography>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <div className="flex space-x-4">
                  <div className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </div>
                  <div className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z"/>
                    </svg>
                  </div>
                  <div className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full cursor-pointer transition-colors">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} className="p-8 bg-white rounded-xl">
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      variant="outlined"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      variant="outlined"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="rounded-lg"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-purple-600 hover:bg-purple-700 py-3 px-6 rounded-lg"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ContactPage;