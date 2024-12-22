export interface Page {
  href: string
  segment: string
  title: string
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
}
