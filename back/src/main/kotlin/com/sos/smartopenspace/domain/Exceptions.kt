package com.sos.smartopenspace.domain

open class BadRequestException(message: String?) : RuntimeException(message)

open class UnprocessableEntityException(message: String?) : RuntimeException(message)

class AlreadyActivedQueuingException : BadRequestException("Encolamiento ya se encuentra activo")
class AnotherTalkIsEnqueuedException : BadRequestException("Existe otra charla encolada")
class BusySlotException : BadRequestException("Slot ocupado")
class CantFinishTalkException : BadRequestException("No podes terminar la charla actual")
class EmptyQueueException : BadRequestException("La cola de charlas está vacía")
class FinishedQueuingException : BadRequestException("Encolamiento finalizado")
class InactiveQueueException : BadRequestException("No está activo el encolamiento")
class NotTheOrganizerException : BadRequestException("No sos el organizador")
class SlotNotFoundException : BadRequestException("No existe un slot en ese horario")
class TalkAlreadyAssignedException : BadRequestException("Charla ya está agendada")
class TalkAlreadyEnqueuedException : BadRequestException("Charla ya está encolada")
class TalkDoesntBelongException : BadRequestException("Charla no pertenece al Open Space")
class TalkIsNotForScheduledException : BadRequestException("Charla no está para agendar")
class TalkIsNotScheduledException : BadRequestException("Charla no está agendada")
class CallForPapersClosedException : UnprocessableEntityException("La convocatoria se encuentra cerrada")
class NotValidTrackForOpenSpaceException : BadRequestException("El track de la charla no pertenece a este open space")
class UserDidntVoteThisTalkException : BadRequestException("Este usuario no voto esta charla")
class NotFoundException(message: String) : BadRequestException(message)