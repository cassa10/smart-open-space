package com.sos.smartopenspace.repositories

import com.sos.smartopenspace.domain.Talk
import com.sos.smartopenspace.persistence.TalkRepository
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.transaction.annotation.Transactional
import javax.persistence.EntityManager
import javax.validation.ConstraintViolationException

@DataJpaTest
@ActiveProfiles("test")
@Transactional
class TalkRepositoryTest {

    @Autowired
    lateinit var repoTalk: TalkRepository

    @Autowired
    lateinit var entityManager: EntityManager

    @Test
    fun `a talk cant be created with an empty name`() {
        val invalidTalk = Talk("")

        assertThrows<ConstraintViolationException> {
            repoTalk.save(invalidTalk)
            entityManager.flush()
        }
    }

    @Test
    fun `a talk can be created with only a name and its saved successfully`() {
        val aTalk = Talk("a name")

        repoTalk.save(aTalk)
        val sameTalk = repoTalk.findById(aTalk.id).get()

        assertEquals(aTalk.name, sameTalk.name)
    }

    @Test
    fun `a talk can be modified and its updated successfully`() {
        val aTalk = Talk("a name", description = "first description")
        repoTalk.save(aTalk)
        val changedDescription = "second description"
        val changedName = "second name"

        aTalk.update(name = changedName, description = changedDescription)
        repoTalk.save(aTalk)
        val sameTalk = repoTalk.findById(aTalk.id).get()

        assertEquals(changedDescription, sameTalk.description)
        assertEquals(changedName, sameTalk.name)
    }

    @Test
    fun `a talk cant be modified with an empty name`() {
        val aTalk = Talk("a name", description = "first description")
        repoTalk.save(aTalk)
        val emptyName = ""

        aTalk.update(name = emptyName, description = aTalk.description)

        assertThrows<ConstraintViolationException> {
            repoTalk.save(aTalk)
            entityManager.flush()
        }

    }
}