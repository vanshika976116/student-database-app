function Sidebar({activeMenu,setActiveMenu}){

    const menus = [

        'Dashboard',
        'Students',
        'Results',
        'Analytics'

    ]

    return(

        <div className="sidebar">

            <div className="logo">
                Result<span>X</span>
            </div>

            <p>
                Student Result Management
            </p>

            <div className="menu">

                {
                    menus.map((menu,index)=>(

                        <button

                            key={index}

                            className={
                                activeMenu === menu
                                ? 'active-btn'
                                : ''
                            }

                            onClick={()=>
                                setActiveMenu(menu)
                            }
                        >

                            {menu}

                        </button>

                    ))
                }

            </div>

        </div>

    )

}