import { Figure } from "./Figure"
import Code from "./Code"
import Table from "./Table"
import Localfile from "./localfile"
import { CloudinaryImage } from "./CloudinaryImage"

const serializers = {
  types: {
    mainImage: Figure,
    code: Code,
    table: Table,
    file: Localfile,
    cloudinaryImage: CloudinaryImage,
  },
}

export default serializers
