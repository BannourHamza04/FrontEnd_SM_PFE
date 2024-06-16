import React from 'react'
import './SideBar.css'
export default function SideBar() {
  return (
    <aside className="sidebar">
        {/* <!-- <header className="sidebar-header">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" className="logo-img">
    </header> --> */}

        <nav>
            <button>
                <span>
                    <i className='bx bx-home'></i>
                    <span>Home</span>
                </span>
            </button>

            <button>
                <span>
                    <i className='bx bx-search'></i>
                    <span>Search</span>
                </span>
            </button>

            <button>
                <span>
                    <i className='bx bx-compass'></i>
                    <span>Explore</span>
                </span>
            </button>

            <button>
                <span>
                    <i className='bx bxl-telegram'>
                        {/* <!-- <span>13</span> --> */}
                    </i>
                    <span>Messages</span>
                </span>
            </button>

            <button>
                <span>
                    <i className='bx bx-heart'>
                        {/* <!-- <em></em> --> */}
                    </i>
                    <span>Notifications</span>
                </span>
            </button>

            <button>
                <span>
                    <i className='bx bx-plus-circle'></i>
                    <span>Create</span>
                </span>
            </button>

            {/* <!-- <button>
            <span>
                <img src="/images/pdp.jpg" alt="" style="border-radius: 50%;">
                <span>Profile</span>
            </span>
        </button> --> */}

        </nav>
    </aside>
  )
}
