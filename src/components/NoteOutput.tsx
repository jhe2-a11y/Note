import { FormattedNote } from "@/types";
import OutputCornell from "./OutputCornell";
import OutputSticky from "./OutputSticky";
import OutputLinear from "./OutputLinear";

interface NoteOutputProps {
  result: FormattedNote;
}

export default function NoteOutput({ result }: NoteOutputProps) {
  switch (result.style) {
    case "cornell":
      return <OutputCornell data={result} />;
    case "sticky":
      return <OutputSticky data={result} />;
    case "linear":
      return <OutputLinear data={result} />;
    default:
      return null;
  }
}
