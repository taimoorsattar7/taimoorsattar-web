"use client"

import React from "react"

import CurriculumSingleton from "@molecule/curriculum-singleton/index"
import PortableText from "@components/portabletext/portableText"
import FlexLayout from "@atom/flex-layout/index"
import Container from "@atom/container/index"

const CurriculumList = ({ children, curriculum }: any) => {
  return (
    <Container>
      {children}
      <FlexLayout>
        {curriculum?.map(
          (
            chapter: {
              title:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined
              _rawBody: any
            },
            index: React.Key | null | undefined
          ) => {
            return (
              <section
                key={index}
                className="flex flex-row gap-2 justify-between sm:justify-between items-center"
              >
                <CurriculumSingleton
                  title={chapter.title}
                  moduleIndex={`Module ${Number(index) + 1}`}
                  rawBody={<PortableText blocks={chapter._rawBody} />}
                />
              </section>
            )
          }
        )}
      </FlexLayout>
    </Container>
  )
}

export default CurriculumList
