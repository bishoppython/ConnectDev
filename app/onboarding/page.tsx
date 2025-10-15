"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { ConnectionType } from "@/lib/types"

const CONNECTION_TYPES: { value: ConnectionType; label: string; description: string }[] = [
  { value: "friendship", label: "Amizade", description: "Conhecer pessoas e fazer amigos" },
  { value: "networking", label: "Networking", description: "Expandir rede profissional" },
  { value: "dating", label: "Namoro", description: "Encontrar relacionamentos" },
  { value: "business", label: "Negócios", description: "Parcerias e investimentos" },
  { value: "creative", label: "Criativo", description: "Projetos criativos e artísticos" },
  { value: "sports", label: "Esportes", description: "Parceiros de treino e atividades" },
  { value: "learning", label: "Aprendizado", description: "Estudar e aprender junto" },
]

const COMMON_INTERESTS = [
  "Tecnologia",
  "Startups",
  "Empreendedorismo",
  "Design",
  "Marketing",
  "Viagens",
  "Fotografia",
  "Música",
  "Arte",
  "Esportes",
  "Leitura",
  "Cinema",
  "Gastronomia",
  "Yoga",
  "Corrida",
  "Investimentos",
  "Inovação",
  "Sustentabilidade",
  "Games",
  "Café",
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [location, setLocation] = useState("")
  const [bio, setBio] = useState("")
  const [occupation, setOccupation] = useState("")
  const [company, setCompany] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<ConnectionType[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState("")

  const { updateProfile } = useAuth()
  const router = useRouter()

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  const toggleType = (type: ConnectionType) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests([...selectedInterests, customInterest.trim()])
      setCustomInterest("")
    }
  }

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleComplete = () => {
    updateProfile({
      name,
      age: age ? Number.parseInt(age) : undefined,
      location,
      bio,
      occupation,
      company,
      connection_types: selectedTypes,
      interests: selectedInterests,
      photos: ["/professional-profile.png"],
    })
    router.push("/discover")
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return name.trim() !== ""
      case 2:
        return selectedTypes.length > 0
      case 3:
        return selectedInterests.length >= 3
      case 4:
        return bio.trim() !== ""
      default:
        return false
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-orange-50 px-4 py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          <CardTitle>Complete seu perfil</CardTitle>
          <CardDescription>
            Etapa {step} de {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo *</Label>
                <Input id="name" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input id="age" type="number" placeholder="25" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    placeholder="São Paulo, SP"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Profissão</Label>
                <Input
                  id="occupation"
                  placeholder="Ex: Desenvolvedor Full Stack"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  placeholder="Ex: Tech Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Que tipo de conexões você busca?</h3>
                <p className="mb-6 text-sm text-muted-foreground">Selecione todas as opções que se aplicam</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CONNECTION_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => toggleType(type.value)}
                      className={`flex flex-col items-start gap-1 rounded-lg border-2 p-4 text-left transition-colors ${
                        selectedTypes.includes(type.value)
                          ? "border-pink-500 bg-pink-50"
                          : "border-border bg-card hover:border-pink-200"
                      }`}
                    >
                      <span className="font-semibold text-foreground">{type.label}</span>
                      <span className="text-sm text-muted-foreground">{type.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Quais são seus interesses?</h3>
                <p className="mb-6 text-sm text-muted-foreground">Selecione pelo menos 3 interesses</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {COMMON_INTERESTS.map((interest) => (
                    <Badge
                      key={interest}
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedInterests.includes(interest)
                          ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600"
                          : ""
                      }`}
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar interesse personalizado"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomInterest())}
                  />
                  <Button type="button" variant="outline" onClick={addCustomInterest}>
                    Adicionar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Conte um pouco sobre você *</Label>
                <Textarea
                  id="bio"
                  placeholder="Escreva uma bio interessante que mostre sua personalidade e o que você busca..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  maxLength={500}
                />
                <p className="text-right text-xs text-muted-foreground">{bio.length}/500 caracteres</p>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Voltar
              </Button>
            )}
            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                Próximo
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed()}
                className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              >
                Concluir
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
