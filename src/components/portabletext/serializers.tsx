import { Figure } from "./Figure"
import Code from "./Code"
import Table from "./Table"
import Localfile from "./localfile"
import { CloudinaryImage } from "./CloudinaryImage"
import { CodepenEmbed } from "./codepenembed"
import { CodesandboxEmbed } from "./codesandboxembed"
import { YoutubeEmbed } from "./youtubeembed"
import { InternalLink } from "./internallink"

const serializers = {
  types: {
    mainImage: Figure,
    code: Code,
    table: Table,
    file: Localfile,
    cloudinaryImage: CloudinaryImage,
    codepenembed: CodepenEmbed,
    codesandboxembed: CodesandboxEmbed,
    youtubeembed: YoutubeEmbed,
    internallink: InternalLink,
  },
}

export default serializers
