import * as React from 'react'
import { createLink, LinkComponent } from '@tanstack/react-router'
import { Button, ButtonProps } from '@mui/material'

const MUILinkComponent = React.forwardRef<HTMLAnchorElement, Omit<ButtonProps, 'href'>>(
  (props, ref) => {
    return <Button component={'a'} ref={ref} {...props} />
  },
)

const CutomButtonLink = createLink(MUILinkComponent)

export const ButtonLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CutomButtonLink preload={'intent'} {...props} />
}