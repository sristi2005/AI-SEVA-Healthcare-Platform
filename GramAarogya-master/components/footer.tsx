import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">AI-SEVA</h2>
          <p className="text-sm text-muted-foreground">Revolutionizing Rural Healthcare</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-1">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/health-check" className="text-muted-foreground transition-colors hover:text-primary">
                  AarogyaMitra AI
                </Link>
              </li>
              <li>
                <Link href="/find-doctor" className="text-muted-foreground transition-colors hover:text-primary">
                  AI-SEVA Connect
                </Link>
              </li>
              <li>
                <Link href="/g-map" className="text-muted-foreground transition-colors hover:text-primary">
                  AI-SEVA Locate
                </Link>
              </li>
              <li>
                <Link href="/news-help" className="text-muted-foreground transition-colors hover:text-primary">
                  AI-SEVA Pulse
                </Link>
              </li>
              <li>
                <Link href="/health-insights" className="text-muted-foreground transition-colors hover:text-primary">
                  AarogyaView
                </Link>
              </li>
            </ul>
          </div>


        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AI-SEVA
        </p>
      </div>
    </footer>
  )
}

