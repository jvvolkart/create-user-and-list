import React, { useState, useRef } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import Menu from '../../components/Menu'
import SafeArea from '../../components/SafeArea'
import Input from './input'
import InputMask from './inputMask'
import './style.css'

const steps = ['Dados iniciais', 'Endereço', 'Dados finais']

const schemas = [
  {
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail obrigatório'),
    name: Yup.string().required('Nome obrigatório'),
    lastname: Yup.string().required('Sobrenome obrigatório'),
    telephone: Yup.string().required('Telefone obrigatório'),
  },
  {
    cep: Yup.string().required('Cep obrigatório'),
    adress1: Yup.string().required('Endereço 1 obrigatório'),
    adress2: Yup.string(),
  },
  {
    birth: Yup.string().required('Data de nascimento obrigatória'),
    cpf: Yup.string().required('CPF obrigatório'),
    income: Yup.string().required('Renda mensal obrigatória'),
  },
]

function Create() {
  const [activeStep, setActiveStep] = useState(0)
  const formRef = useRef()
  const navigate = useNavigate()

  const handleNext = async () => {
    let data = formRef.current.getData()
    console.log(data)
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape(schemas[activeStep])
      await schema.validate(data, {
        abortEarly: false,
      })
      // Validation passed
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    } catch (err) {
      const validationErrors = {}

      if (err instanceof Yup.ValidationError) {
        // Validation failed
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)
      }
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({})

      const schema = Yup.object().shape(schemas[activeStep])
      await schema.validate(data, {
        abortEarly: false,
      })

      // Validation passed
      data.id = Date.now()
      let clients = JSON.parse(localStorage.getItem('clients')) || []
      clients.push(data)
      localStorage.setItem('clients', JSON.stringify(clients))
      toast.success('Cliente cadastrado.')
      navigate('/clients')
    } catch (err) {
      const validationErrors = {}

      if (err instanceof Yup.ValidationError) {
        // Validation failed
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message
        })
        formRef.current.setErrors(validationErrors)

        console.log(err)
      }
    }
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
            Cadastrar cliente
          </Typography>
          <Box sx={{ width: '65%' }}>
            <Stepper activeStep={activeStep} style={{ marginBottom: '20px' }}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Todos os passos concluídos - você terminou
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Form onSubmit={handleSubmit} ref={formRef}>
                  <div
                    style={{
                      display: activeStep > 0 ? 'none' : 'flex',
                      padding: '0px 40px',
                      justifyContent: 'center',
                    }}
                  >
                    <Box className='inputsContainer'>
                      <Box className='inputBox'>
                        <h5>Nome</h5>
                        <Input
                          name='name'
                          type='text'
                          placeholder='Digite seu nome'
                          autoFocus
                          spellCheck={false}
                          style={{
                            padding: '10px',
                            border: '1px solid #00a335',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                      <Box className='inputBox'>
                        <h5>Sobrenome</h5>
                        <Input
                          name='lastname'
                          type='text'
                          placeholder='Digite seu sobrenome'
                          spellCheck={false}
                          style={{
                            padding: '10px',
                            border: '1px solid #00a335',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                      <Box className='inputBox'>
                        <h5>Endereço de e-mail</h5>
                        <Input
                          name='email'
                          type='email'
                          placeholder='Digite seu e-mail'
                          spellCheck={false}
                          style={{
                            padding: '10px',
                            border: '1px solid #00a335',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                      <Box className='inputBox'>
                        <h5>Telefone</h5>
                        <InputMask
                          name='telephone'
                          type='text'
                          placeholder='Digite seu telefone'
                          mask='(99) 99999-9999'
                          style={{
                            padding: '10px',
                            border: '1px solid #00a335',
                            borderRadius: '4px',
                          }}
                        />
                      </Box>
                    </Box>
                  </div>
                  <div
                    style={{
                      display: activeStep === 1 ? 'flex' : 'none',
                      justifyContent: 'center',
                    }}
                  >
                    <Box className='inputBox'>
                      <h5>CEP</h5>
                      <InputMask
                        name='cep'
                        type='text'
                        placeholder='Digite seu CEP'
                        mask='99999-999'
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                    <Box className='inputBox'>
                      <h5>Endereço 1</h5>
                      <Input
                        name='adress1'
                        type='text'
                        placeholder='Rua exemplo 1, 101'
                        spellCheck={false}
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                    <Box className='inputBox'>
                      <h5>Endereço 2</h5>
                      <Input
                        name='adress2'
                        type='text'
                        placeholder='Rua exemplo 2, 202'
                        spellCheck={false}
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </div>
                  <div
                    style={{
                      display: activeStep === 2 ? 'flex' : 'none',
                      justifyContent: 'center',
                    }}
                  >
                    <Box className='inputBox'>
                      <h5>Data Nascimento</h5>
                      <InputMask
                        name='birth'
                        type='text'
                        placeholder='22/02/1999'
                        mask='99/99/9999'
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                    <Box className='inputBox'>
                      <h5>CPF</h5>
                      <InputMask
                        name='cpf'
                        type='text'
                        placeholder='704.198.265-45'
                        mask='999.999.999-99'
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                    <Box className='inputBox'>
                      <h5>Renda mensal</h5>
                      <Input
                        name='income'
                        type='text'
                        placeholder='1500'
                        spellCheck={false}
                        style={{
                          padding: '10px',
                          border: '1px solid #00a335',
                          borderRadius: '4px',
                        }}
                      />
                    </Box>
                  </div>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      pt: 2,
                      mt: 2,
                    }}
                  >
                    <Button
                      color='inherit'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>

                    <Button
                      type='submit'
                      style={{
                        display:
                          activeStep === steps.length - 1 ? 'flex' : 'none',
                      }}
                    >
                      Salvar
                    </Button>
                    <Button
                      onClick={handleNext}
                      style={{
                        display:
                          activeStep !== steps.length - 1 ? 'flex' : 'none',
                      }}
                    >
                      Próximo
                    </Button>
                  </Box>
                </Form>
              </React.Fragment>
            )}
          </Box>
        </Box>
      </SafeArea>
    </>
  )
}

export default Create
