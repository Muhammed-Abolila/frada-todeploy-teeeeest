import "./FormFooter.css"
import Link from 'next/link'
export const FormFooter = ({link,title,subTitle}) => {
  return (
    <div className="form-footer">
          <Link href={link}>
            <div className="create-account">{title}</div>
          </Link>
          <p>{subTitle}</p>
        </div>
  )
}
