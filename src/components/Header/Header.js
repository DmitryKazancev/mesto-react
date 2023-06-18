import logo from '../../images/logo-header.svg'
export default function Header() {
    return (
        <header className="header">
            <img
                src={logo}
                alt="Логотип сайта Место"
                className="header__logo"
            />
        </header>
    )
}