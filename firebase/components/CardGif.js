


import { Card, Grid, Row, Text } from '@nextui-org/react'
import React from 'react'
import { toast } from 'react-toastify'

export const CardGif = ({ id, image, author, select, title }) => {
  
    const onClick = () => {

        navigator.clipboard.writeText(image)
      toast.success("Copied to clipboard")
    }
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card
        hoverable
        clickable
        onClick={onClick}
      >
        <Card.Body css={{ p: 1 }}>
            <Card.Image
                src={image}
                width={240}
                height={140}
            />
        </Card.Body>
        <Card.Footer>
            <Row justify="space-between">
                <Text transform="capitalize">{title}</Text>
                <Text>{select}</Text>
            </Row>
        </Card.Footer>
    </Card>
</Grid>
  )
}
