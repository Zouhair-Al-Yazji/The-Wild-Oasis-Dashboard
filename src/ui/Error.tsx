export default function Error({ message }: { message: string }) {
  return <p className="text-destructive">{message}</p>;
}
