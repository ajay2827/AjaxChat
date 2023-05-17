/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        'homeprimary':"#e84a5f",
        'textred':"#fd5c63",
         'bg':'#002047',
         'text':'#989BA1',
         'text1':'#555758',
          'button':'#1D75DD',
          'button2':"#085EC3",
          'model':'rgba(0,0,0,0.5)',
          "comp":"#001329",
          "comp1":"#002047",
           "text2":"#CBCBCB"
      },
      width:{
        sw:'550px',
        rw:'450px',
        pc:'700px',
        gm:'600px',
        sw1:'350px',
        rw1:'350px',
        sw1:'400px',
        gm1:'450px'
      },
      height:{
        chatside:"600px",
        userchats:"600px",
        model:"400px",
        m:'450px',
        sm:'50px',
        m1:'550px',
        m2:'90%'

      }
      ,
      fontFamily:
      {
         head:['Libre+Baskerville'],
         open:['Open+Sans'],
         Dosis:['Dosis'],
         Acme:['Acme'],         
         Dancing:['Dancing'],
         Coming:"'Coming Soon', cursive",
      },
      minHeight:{
        'groupmodel':'300px'
      },
      maxWidth:{
        'mw':'75%'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
