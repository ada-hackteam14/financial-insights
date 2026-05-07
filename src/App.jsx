import FotoPerfil from "./assets/foto.jpg";

//icons
import { LayoutDashboard,
  ShoppingCart,
  LayoutPanelTop,  
  ShoppingBag, 
  Tag ,
  Headset, 
  SquareArrowRightExit 
} from 'lucide-react';


import './App.css'

function App() {

  const menuItems = [
    { icon: LayoutDashboard, text: "Home" },
    { icon: ShoppingBag, text: "Produtos" },
    { icon: LayoutPanelTop, text: "Categorias" },
    { icon: ShoppingCart, text: "Compras" },
    { icon: Tag, text: "Recomendações" },
    { icon: Headset, text: "Suporte" },
    { icon: SquareArrowRightExit, text: "Sair" },
  ];

  return (
    <header>
      <h1>Dashboard</h1>
        <div className="perfil">
          <img className="photo" src={FotoPerfil} alt='Foto de perfil'/>

          <p>Ana</p>
        </div>

        <nav>
            {menuItems.map((item,index) =>{
            const Icon = item.icon;

            return(
              <button key={index} className="menu-button">
                <Icon className="icon" />
              {item.text}

              </button>
            );
          })}
        </nav>      
    </header>  
  )
}

export default App
