import React, { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloseIcon from '@mui/icons-material/Close'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import Menu from '../../components/Menu'
import SafeArea from '../../components/SafeArea'

function Clients() {
  const [clients, setClients] = useState([])
  const [activeClient, setActiveClient] = useState({})
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setClients(JSON.parse(localStorage.getItem('clients')))
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function showMore(id) {
    const client = clients.find((item) => item.id === id)
    setActiveClient(client)

    handleOpen()
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: '4px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: '30px',

    div: {
      marginBottom: '10px',
      marginRight: '5px',
    },
  }

  return (
    <>
      <Menu />
      <SafeArea>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h5' sx={{ mb: 3 }}>
            Clientes
          </Typography>
          <Box sx={{ width: '65%' }}>
            {clients && clients.length ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>CEP</TableCell>
                      <TableCell>Data de nascimento</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.cep}</TableCell>
                        <TableCell>{row.birth}</TableCell>
                        <TableCell>
                          <Tooltip title='Ver mais' placement='top'>
                            <IconButton
                              aria-label='ver mais'
                              onClick={() => showMore(row.id)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                Nenhum cliente cadastrado
                <SentimentVeryDissatisfiedIcon sx={{ marginLeft: '5px' }} />
              </Typography>
            )}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '25px',
                    position: 'relative',
                  }}
                >
                  <IconButton
                    aria-label='fechar'
                    onClick={() => handleClose()}
                    sx={{ position: 'absolute', right: '-15px', top: '-15px' }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant='h5' sx={{ marginBottom: '15px' }}>
                    Dados do cliente
                  </Typography>
                </Box>
                <TextField
                  id='outlined-basic'
                  label='Nome'
                  variant='outlined'
                  size='small'
                  value={activeClient.name}
                />
                <TextField
                  id='outlined-basic'
                  label='Sobrenome'
                  variant='outlined'
                  size='small'
                  value={activeClient.lastname}
                />
                <TextField
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  size='small'
                  value={activeClient.email}
                />
                <TextField
                  id='outlined-basic'
                  label='Telefone'
                  variant='outlined'
                  size='small'
                  value={activeClient.telephone}
                />
                <TextField
                  id='outlined-basic'
                  label='CEP'
                  variant='outlined'
                  size='small'
                  value={activeClient.cep}
                />
                <TextField
                  id='outlined-basic'
                  label='Endereço 1'
                  variant='outlined'
                  size='small'
                  value={activeClient.adress1}
                />
                <TextField
                  id='outlined-basic'
                  label='Endereço 2'
                  variant='outlined'
                  size='small'
                  value={activeClient.adress2}
                />
                <TextField
                  id='outlined-basic'
                  label='Data de nascimento'
                  variant='outlined'
                  size='small'
                  value={activeClient.birth}
                />
                <TextField
                  id='outlined-basic'
                  label='CPF'
                  variant='outlined'
                  size='small'
                  value={activeClient.cpf}
                />
                <TextField
                  id='outlined-basic'
                  label='Renda mensal'
                  variant='outlined'
                  size='small'
                  value={activeClient.income}
                />
              </Box>
            </Modal>
          </Box>
        </Box>
      </SafeArea>
    </>
  )
}

export default Clients
