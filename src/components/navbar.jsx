import {
  LayoutDashboard,
  ShoppingCart,
  LayoutPanelTop,
  ShoppingBag,
  Tag,
  Headset,
  SquareArrowRightExit,
} from "lucide-react";

import FotoPerfil from "../assets/foto.jpg";

export default function NavBar() {
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
        <header className="sticky top-0 h-screen w-[300px] min-h-screen bg-white flex flex-col items-center border-r border-[#E5E7EB]">

        <h1 className="flex flex-col items-center mt-10 text-[#292B32] text-[25px] ">
            Dashboard
        </h1>

        <div className="flex flex-col items-center mt-10">
            <img 
                className=" w-40 h-40 rounded-full object-cover"
                src={FotoPerfil}
                alt="Foto de perfil"
            />

            <p className="mt-[10px] text-[18px] font-medium text-[#6E789C]">
                Ana
            </p>
        </div>

        <nav>
            {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
                <button key={index} 
                className="
                    w-[230px]
                    h-[52px]
                    flex
                    items-center
                    gap-[10px]
                    border-none
                    rounded-[10px]
                    text-[#6E789C]
                    bg-white
                    pl-[18px]
                    text-[16px]
                    font-medium
                    cursor-pointer
                    transition
                    hover:bg-[#F1EEFD]
                    hover:text-[#A994FC]"
                >
                    <Icon className="w-[18px] h-[18px] text-[#6E789C] shrink-0" />
                    {item.text}
                </button>
            );
            })}
        </nav>
        </header>
    );
}

