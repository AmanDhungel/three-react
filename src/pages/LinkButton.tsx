import { Link } from 'react-router-dom'

const LinkButton = ({to, children} : {to: string, children: string}) => {
  return (
    <Link className={`opacity-0 translate-y-[20rem] bg-gray-600 p-4 rounded-xl transition-all duration-200 hover:bg-gray-500`} to={to} id='button'>{children}</Link>
  )
}

export default LinkButton