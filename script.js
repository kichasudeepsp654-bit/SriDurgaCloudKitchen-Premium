*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
scroll-behavior:smooth;
}

body{
background:#faf8f4;
color:#222;
}

.hero{
height:100vh;
background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),
url("images/banner.jpg");
background-size:cover;
background-position:center;
display:flex;
flex-direction:column;
}

nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:20px 8%;
background:rgba(255,255,255,.08);
backdrop-filter:blur(10px);
}

nav h2{
color:#fff;
font-size:30px;
font-weight:700;
}

nav a{
color:#fff;
text-decoration:none;
margin-left:20px;
font-weight:500;
}

.hero-content{
flex:1;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
text-align:center;
color:#fff;
padding:20px;
}

.hero-content h1{
font-size:55px;
margin-bottom:20px;
}

.hero-content p{
font-size:20px;
margin-bottom:30px;
}

.btn{
background:#ff7a00;
padding:16px 34px;
border-radius:50px;
text-decoration:none;
color:#fff;
font-weight:600;
transition:.3s;
}

.btn:hover{
background:#e76500;
}

section{
padding:80px 8%;
}

section h2{
text-align:center;
font-size:38px;
margin-bottom:40px;
}

.special-card{
max-width:500px;
margin:auto;
background:#fff;
padding:30px;
border-radius:20px;
box-shadow:0 15px 40px rgba(0,0,0,.1);
text-align:center;
}

.special-card p{
margin:10px 0;
}

.menu-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
gap:25px;
}

.card{
background:#fff;
padding:30px;
border-radius:20px;
box-shadow:0 15px 35px rgba(0,0,0,.1);
transition:.3s;
text-align:center;
}

.card:hover{
transform:translateY(-10px);
}

.card h3{
margin-bottom:15px;
}

@media(max-width:768px){

nav{
flex-direction:column;
gap:15px;
}

.hero-content h1{
font-size:34px;
}

.hero-content p{
font-size:18px;
}

section h2{
font-size:30px;
}

  }
