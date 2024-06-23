import { Container } from "./Container";

export function Footer() {
  const year = new Date().getUTCFullYear();
  return (
    <footer className="w-full font-jetbrains">
      <Container className="dark:text-vm-100/50 text-vm-900/50 flex gap-2 justify-center">
        <p>{`© Copyright ${year} todos os direitos reservados, Semea Tech`}</p>
      </Container>
    </footer>
  )
}